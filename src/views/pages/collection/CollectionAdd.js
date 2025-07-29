import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import swal from 'sweetalert';
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Tab
} from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";
import { toggleLoadingBar, selectLoadingBar, toggleToaster, selectToasterData, selectToasterStatus } from 'provider/features/helperSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingIcon from 'others/icons/LoadingIcon';
import axiosInstance from "services/axios";
import Spinner from 'react-bootstrap/Spinner';
import { IconPicker } from "others/icons/IconPicker";
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Name } from "ajv";
import CollectionTeam from "./sub/CollectionTeam";
import CollectionUser from "./sub/CollectionUser";

function CollectionAdd(props) {
    const [collections, setCollection] = useState([]);
    const [accessLevel, setAccessLevel] = useState([]);
    const dispatch = useDispatch();
    const [pending, setPending] = useState(false);
    const [activeTab, setActiveTab] = useState('collections');

    const tabs = [
        { id: 'collections', label: 'Entry' },
        { id: 'teams', label: 'Teams' },
        { id: 'users', label: 'Users' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'collections':
                return <CollectionsTab />;
            case 'teams':
                return <TeamsTab />;
            case 'users':
                return <UsersTab />;
            default:
                return <CollectionsTab />;
        }
    };

    const [formValue, setFormValue] = useState(
        {
            id: '',
            deployment: '',
            name: '',
            type: '',
            description: '',
            access_level: "",
            assessment: "",
            created_by: "",
            icon: "",
            color: "",
        }
    );

    useEffect(() => {
        if (props.record && props.formType == "update") {
            setFormValue(props.record);

        } else {
            setFormValue({
                id: '',
                deployment: props?.deploymentId,
                name: '',
                type: '',
                description: '',
                access_level: "",
                assessment: "",
                created_by: "",
                icon: "",
                color: "",
            })
        }
    }, [props.record, props.formType]);

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = () => {
        setFormValue({
            ...formValue,
            deployment: props?.deploymentId,
        });
        if (validateformData(formValue, setInvalidFields)) {
            // alert('form valid')

            addRecordInstance(formValue);
            setFormValue({
                name: '',
                deployment: props?.deploymentId,
                type: '',
                description: '',
                assessment: "",
                icon: "",
                access_level: "",
                color: "",
            })

        } else {
            setTimeout(() => {
                // Your data here
                setInvalidFields("");
            }, 5000)
        }


    }

    const handleUpdate = () => {
        if (validateformData(formValue, setInvalidFields)) {
            updateRecordInstance(formValue);
        } else {
            setTimeout(() => {
                // Your data here
                setInvalidFields("");
            }, 5000)
        }

    }

    const [invalidFields, setInvalidFields] = useState('');
    function validateformData(formData, setInvalidFields) {
        const invalidFields = []; // Array to store invalid field messages

        // Check for empty required fields
        if (!formData.name) {
            invalidFields.push('Collection Name');
        }
        if (!formData.description) {
            invalidFields.push('Description');
        }
        if (!formData.access_level) {
            invalidFields.push('Access Level');
        }


        if (invalidFields.length > 0) {
            const errorText = `Please fill in the following required fields: ${invalidFields.join(', ')}`;
            setInvalidFields(errorText); // Update state with comma-separated error message
            return false; // Invalid data
        }

        return true; // Valid data
    }

    const addRecordInstance = async (data) => {

        setPending(true);
        const results = await axiosInstance.post('createDeploymentCollection',
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('access')}`
                },
                //   withCredentials: true
            }
        );
        if (results?.data?.status == "success") {

            dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Collection Added Successfully" } }))

            setPending(false);
            props.populateList(results?.data?.data);
            props?.setCurrentPage('list');

        } else {
            setPending(false);
            dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: results?.data?.message } }))
        }
    }

    const updateRecordInstance = async (data) => {

        setPending(true);
        const results = await axiosInstance.post('updateDeploymentCollection',
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('access')}`
                },
                //   withCredentials: true
            }
        );
        if (results?.data?.status == "success") {

            dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Collection Updated Successfully" } }))

            setPending(false);
            props.updateListRecord(results?.data?.data);
            props?.setCurrentPage('list');

        } else {
            setPending(false);
            dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: results?.data?.message } }))
        }
    }
    const handleIconSelection = ({ iconClass, color }) => {

        setFormValue({
            ...formValue,
            icon: iconClass,
            color: color,
        });
        console.log(formValue)
    };

    const handleDelete = (val) => {

        swal({
            title: "Confirm Deletion",
            text: "Once Confirmed, Record Will Be Deleted",
            icon: "warning",
            buttons: ["Cancel", "Confirm"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {



                    deleteRecord(val);
                } else {
                    // swal("No Action Taken!");

                }
            });

    }

    const deleteRecord = async (idD) => {
        setPending(true);
        const results = await axiosInstance.post('deleteDeploymentCollection',
            JSON.stringify({ id: idD }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('access')}`
                },
            }
        );
        if (results?.data?.status == 'success') {

            dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: " Deleted Successfully" } }))

            setPending(false);
            props?.updateListRecordDelete(idD);
        } else {
            //  alert("not deleted");
        }
    }

    useEffect(() => {
        let deployment = localStorage.getItem('deployment');

        if (deployment && deployment !== undefined) {

        } else {

            window.location.replace('/pages/login');
        }
        if (deployment && deployment !== undefined) {
            getLookupData(JSON.parse(deployment).id);

        }

    }, []);
    const getLookupData = async (deployment_id) => {
        // setPending(true);
        try {
            const response = await axiosInstance.get('getPostLookups/' + deployment_id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('access')}`
                    },
                    //   withCredentials: true
                }
            );

            setPending(false);
            if (response?.data) {
                let dData = response?.data?.post_lookups;
                // setCategories(dData?.categories);
                // setImpactLevel(dData?.impact_levels);
                setAccessLevel(dData?.access_levels);
                // setPriorityLevel(dData?.priority_levels);
                // setStatus(dData?.statuses);
                // console.log(dData);

            }
        } catch (err) {
            setPending(false);


        }



    }
    // Sample data - in a real app, you'd fetch this from an API
    const [teams, setTeams] = useState([
        { id: 1, collection_id: 2, name: 'Team 1', description: 'Marketing team' },
        { id: 2, collection_id: 6, name: 'Team 2', description: 'Development team' },
        { id: 3, collection_id: 8, name: 'Team 3', description: 'Sales team' }
    ]);

    const [users, setUsers] = useState([
        { id: 1, collection_id: 6, name: 'John Doe', email: 'john@example.com' },
        { id: 2, collection_id: 1, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, collection_id: 2, name: 'Bob Johnson', email: 'bob@example.com' }
    ]);

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        email: '',
        collection_id: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowForm(false);
        setIsEditMode(false);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            description: '',
            email: '',
            collection_id: ''
        });
        setIsEditMode(false);
    };

    // Handle form submission
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setPending(true);

        try {
            if (activeTab === 'teams') {
                // Team submission logic
                if (isEditMode) {
                    // Update team
                    const response = await axiosInstance.put(`teams/${formData.id}`, formData);
                    setTeams(teams.map(team => team.id === formData.id ? response.data : team));
                    dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Team updated successfully" } }));
                } else {
                    // Add new team
                    const response = await axiosInstance.post('teams', formData);
                    setTeams([...teams, response.data]);
                    dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Team added successfully" } }));
                }
            } else {
                // User submission logic
                if (isEditMode) {
                    // Update user
                    const response = await axiosInstance.put(`users/${formData.id}`, formData);
                    setUsers(users.map(user => user.id === formData.id ? response.data : user));
                    dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "User updated successfully" } }));
                } else {
                    // Add new user
                    const response = await axiosInstance.post('users', formData);
                    setUsers([...users, response.data]);
                    dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "User added successfully" } }));
                }
            }

            setShowForm(false);
            resetForm();
        } catch (error) {
            console.error(error);
            dispatch(toggleToaster({ isOpen: true, toasterData: { type: "error", msg: "An error occurred. Please try again." } }));
        } finally {
            setPending(false);
        }
    };

    // Edit item
    const handleEdit = (item) => {
        setFormData({
            id: item.id,
            name: item.name,
            description: item.description || '',
            email: item.email || '',
            collection_id: item.collection_id
        });
        setIsEditMode(true);
        setShowForm(true);
    };

    // Delete item
    const handleDelete2 = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        setPending(true);
        try {
            if (activeTab === 'teams') {
                await axiosInstance.delete(`teams/${id}`);
                setTeams(teams.filter(team => team.id !== id));
                dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Team deleted successfully" } }));
            } else {
                await axiosInstance.delete(`users/${id}`);
                setUsers(users.filter(user => user.id !== id));
                dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "User deleted successfully" } }));
            }
        } catch (error) {
            console.error(error);
            dispatch(toggleToaster({ isOpen: true, toasterData: { type: "error", msg: "Failed to delete item" } }));
        } finally {
            setPending(false);
        }
    };
    return (
        <>

            <Card>
                <Card.Header>
                    <Card.Title as="h4">

                        <div className="flex items-start justify-between">
                            <span>Collection | <span className="text-[0.6em] capitalize"> {props?.formType} <span className="italic">: {formValue?.name}</span> </span> </span>
                            <Button variant="default" onClick={() => props?.setCurrentPage('list')}>Cancel</Button>

                        </div>
                    </Card.Title>
                </Card.Header>
                <Card.Body >

                    <hr />
                    {pending && (<div className="flex items-center justify-center mb-4">
                        <Spinner animation="grow" variant="warning" />
                    </div>)}
                    <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.75,
                        }}
                        className="nav-bar"
                    >
                        <div className="max-w-4xl mx-auto ">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8">
                                    {props.formType == 'update' && <>
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                                        ? 'border-blue-500 text-blue-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </>}
                                </nav>
                            </div>
                            <div className="py-6 md:min-h-[450px] relative">
                                {/* {renderTabContent()} */}
                                {activeTab == 'collections' &&
                                    <div className="">

                                        <div>
                                            <div className="grid gap-6 md:grid-cols-2 ">
                                                <div className="mb-6">
                                                    <label
                                                        htmlFor="survey_description"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Pick An Icon And Color
                                                    </label>
                                                    <IconPicker onSelection={handleIconSelection}
                                                        initialIconClass={formValue.icon}
                                                        initialColor={formValue.color}
                                                    />
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entity Type</label>

                                                    <select style={{ width: "100%" }} className="border border-gray-200 rounded-lg min-h-[2.5em] " value={formValue.type} required onChange={handleChange} name="type">
                                                        <option>Collection Type</option>

                                                        <option value='post'>Posts</option>
                                                        <option value='entity'>Entities</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2 ">
                                                <div className="mb-6">
                                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection Name</label>
                                                    <input type="text" onChange={handleChange} name="name" value={formValue.name} id="name" className=" focus:bg-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name of Collection" required />
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="access_level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Access Level</label>

                                                    <select style={{ width: "100%" }} className="border border-gray-200 rounded-lg min-h-[2.5em] " value={formValue.access_level} required onChange={handleChange} name="access_level">
                                                        <option>Select Access Level</option>
                                                        {accessLevel?.map((record, index) => (
                                                            <option key={index} value={record?.level}>{record?.name} level[{record?.level}] </option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2 ">
                                            <div className="mb-6">
                                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe the Collection</label>
                                                <textarea id="description" onChange={handleChange} name="description" value={formValue.description} rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white  focus:bg-white" placeholder="Collection Description..."></textarea>

                                            </div>
                                            <div className="mb-6">
                    <label htmlFor="assessment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Assessment (text to help with understanding )
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="assessment"
                      value={formValue.assessment}
                      id="title"
                      className="focus:bg-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write Assessment"
                      required
                    />
                  </div>
                  </div>
                                            <div>
                                                {invalidFields !== "" && (<p className='bg-red-700 shadow text-left p-3 rounded-xl text-white'>{invalidFields}</p>)}
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-2 ">
                                                <div className="flex items-start justify-between">
                                                    {props.formType == "add" ?
                                                        <span>.</span> :
                                                        <a onClick={() => handleDelete(formValue?.id)} className="cursor-pointer text-red-600 hover:text-red-700" disabled={pending}>Delete</a>
                                                    }
                                                    {props.formType == "add" ? <button type="submit" onClick={handleSubmit} disabled={pending} className="text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Add New</button> :
                                                        <button type="submit" onClick={handleUpdate} disabled={pending} className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {activeTab == 'teams' &&
                                    <CollectionTeam collectionId={formValue.id} />
                                }
                                {activeTab == 'users' &&
                                    <CollectionUser collectionId={formValue.id} />
                                }
                            </div>
                        </div>


                    </motion.div>
                </Card.Body>
            </Card>

        </>
    );
}

export default CollectionAdd;
