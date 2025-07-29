import { React, useState, useEffect } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Container,
  Row,
  Col,
  Tab,
} from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  toggleLoadingBar,
  selectLoadingBar,
  toggleToaster,
  selectToasterData,
  selectToasterStatus,
} from "provider/features/helperSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingIcon from "others/icons/LoadingIcon";
import axiosInstance from "services/axios";
import { login, logout, selectUser } from "provider/features/userSlice";
import Spinner from "react-bootstrap/Spinner";
import { addCollections, removeCollections } from "provider/features/collectionSlice";
import{toggleSearchValue} from "provider/features/globalSearchSlice";
import { CiEdit } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import SinglePostListCard from "./SinglePostListCard";
import PostList from "./PostList";
import FilterTopNav from "./FilterTopNav";
import PostSearch from "./PostSearch";
import LocationSearch from "./LocationSearch";
import AutocompleteLocationSearch from "./AutocompleteLocationSearch";
import useCSVExport from "hooks/useCSVExport";

function DataViewPage() {
  const exportToCSV = useCSVExport();
  const [pending, setPending] = useState(false);
  const [postData, setPostData] = useState([]);
  let urlLocation = useLocation();
  const [posts, setPost] = useState([]);
  const collectionOn = useSelector((state) => state.collection.collectionOn);
  const collectionIdNew = useSelector((state) => state.collection.collectionId);
  const collectionName = useSelector((state) => state.collection.collectionName);
  const searchEmpty = useSelector((state) => state.globalSearch.searchValueEmpty);
  const searchValue = useSelector((state) => state.globalSearch.searchValue);
  const searchParams = new URLSearchParams(urlLocation.search);
  const collectionId = searchParams.get("collection") || "0";
  const dispatch = useDispatch();
  let navigate = useHistory();
  const doExportToCSV = ()=>{
    exportToCSV(filteredPosts, 'data.csv');

  }
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  useEffect(() => {
    let deployment = localStorage.getItem("deployment");
    if (deployment && deployment !== undefined) {
      if (collectionId == "0") {
        getPostData(JSON.parse(deployment).id);
      } else {
        getCollectionPostData(collectionId);
      }
    }
  }, []);

  useEffect(() => {
    let deployment = localStorage.getItem("deployment");
    if (deployment && deployment !== undefined) {
      if (collectionId == "0" || collectionIdNew == "0") {
        getPostData(JSON.parse(deployment).id);
      } else {
        getCollectionPostData(collectionIdNew);
      }
    }
  }, [collectionIdNew, collectionOn]);

  const getPostData = async (deployment_id) => {
    try {
      setPending(true);
      const response = await axiosInstance.get("getPostData/" + deployment_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (response?.data) {
        let dData = response?.data?.posts;
        setPost(dData);
        setPending(false);
      }
    } catch (err) {
      console.error(err);
      setPending(false);
    }
  };

  const getCollectionPostData = async (deployment_id) => {
    try {
      setPending(true);
      const response = await axiosInstance.get(
        "getCollectionPostData/" + deployment_id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      if (response?.data) {
        let dData = response?.data?.posts;
        setPost(dData);
        setPending(false);
      }
    } catch (err) {
      console.error(err);
      setPending(false);
    }
  };

  // State for filters
  const [selectedSurveys, setSelectedSurveys] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [locationFilter, setLocationFilter] = useState({
    latitude: null,
    longitude: null,
    range: null, // Range in kilometers
  });

  // State for filtered posts
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Haversine formula to calculate distance
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Update filtered posts whenever filters change
  useEffect(() => {
    const filtered = posts.filter((post) => {
      // Filter by surveys
      const surveyMatch =
        selectedSurveys.length === 0 ||
        selectedSurveys.includes(post.name_of_survey);

      // Filter by categories
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(post.category_name);

      // Filter by statuses
      const statusMatch =
        selectedStatuses.length === 0 || selectedStatuses.includes(post.status);

      // Filter by date range
      const postDate = new Date(post.created_at).setHours(0, 0, 0, 0);
      const startDate = dateRange[0]
        ? new Date(dateRange[0]).setHours(0, 0, 0, 0)
        : null;
      const endDate = dateRange[1]
        ? new Date(dateRange[1]).setHours(0, 0, 0, 0)
        : null;

      const dateMatch =
        (!startDate || postDate >= startDate) &&
        (!endDate || postDate <= endDate);

      // Filter by location
      const locationMatch =
        !locationFilter.latitude ||
        !locationFilter.longitude ||
        !locationFilter.range ||
        haversineDistance(
          locationFilter.latitude,
          locationFilter.longitude,
          parseFloat(post.latitude),
          parseFloat(post.longitude)
        ) <= locationFilter.range;

      // Filter by search value
      const searchMatch =
        searchEmpty ||
        (searchValue &&
          (post.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
            post.description?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
            post.name_of_survey?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
            post.category_name?.toLowerCase()?.includes(searchValue.toLowerCase())));

      return surveyMatch && categoryMatch && statusMatch && dateMatch && locationMatch && searchMatch;
    });

    setFilteredPosts(filtered);
  }, [selectedSurveys, selectedCategories, selectedStatuses, dateRange, locationFilter, posts, searchEmpty, searchValue]);

  // Handle checkbox changes
  const handleSurveyChange = (survey) => {
    setSelectedSurveys((prev) =>
      prev.includes(survey)
        ? prev.filter((s) => s !== survey) // Uncheck
        : [...prev, survey] // Check
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Uncheck
        : [...prev, category] // Check
    );
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status) // Uncheck
        : [...prev, status] // Check
    );
  };

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSurveys([]);
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setDateRange([null, null]);
    setLocationFilter({ latitude: null, longitude: null, range: null });
    dispatch(removeCollections({ name: "", collectionId: "" }));
    dispatch(toggleSearchValue(""));
  };

  // Get unique values for filters
  const uniqueSurveys = [...new Set(posts.map((post) => post.name_of_survey))];
  const uniqueCategories = [...new Set(posts.map((post) => post.category_name))];
  const uniqueStatuses = [...new Set(posts.map((post) => post.status))];

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationSelect = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationFilter((prev) => ({
      ...prev,
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    }));
  };

  const handleRangeSelect = (event) => {
    setLocationFilter((prev) => ({
      ...prev,
      range: parseFloat(event.target.value),
    }));
  };

  const handlePostUpdateStatus = (id, status) => {
    updateRecordStatus(id, status);
  };

  const handleDelete = (val) => {
    swal({
      title: "Confirm Deletion",
      text: "Once Confirmed, Record Will Be Deleted",
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteRecord(val);
      }
    });
  };

  const deleteRecord = async (idD) => {
    setPending(true);
    try {
      const results = await axiosInstance.post(
        "deletePost",
        JSON.stringify({ id: idD }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      if (results?.data?.status === "success") {
        dispatch(
          toggleToaster({
            isOpen: true,
            toasterData: { type: "success", msg: results?.data?.message },
          })
        );
        setPending(false);
        updateListRecordDelete(idD);
      }
    } catch (error) {
      console.error("Error deleting survey:", error);
      setPending(false);
    }
  };

  const handleRemove = (val,col) => {
    swal({
      title: "Confirm Removal",
      text: "Once Confirmed, Record Will Be Removed",
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeRecord(val,col);
      }
    });
  };

  const removeRecord = async (idD,collection) => {
    setPending(true);
    try {
      const results = await axiosInstance.post(
        "removePostFromCollection",
        JSON.stringify({ post_id: idD,collection_id:collection }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      if (results?.data?.status === "success") {
        dispatch(
          toggleToaster({
            isOpen: true,
            toasterData: { type: "success", msg: results?.data?.message },
          })
        );
        setPending(false);
        updateListRecordDelete(idD);
      }
    } catch (error) {
      console.error("Error deleting survey:", error);
      setPending(false);
    }
  };

  const updateRecordStatus = async (idD, pStatus) => {
    setPending(true);
    try {
      const results = await axiosInstance.post(
        "publishPost",
        JSON.stringify({ id: idD, status: pStatus }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      if (results?.data?.status === "success") {
        let newData = results?.data?.data;
        dispatch(
          toggleToaster({
            isOpen: true,
            toasterData: { type: "success", msg: results?.data?.message },
          })
        );
        setPending(false);
        updateListRecord(newData);
      }
    } catch (error) {
      console.error("Error deleting survey:", error);
      setPending(false);
    }
  };

  const updateListRecord = (updatedRecord) => {
    window.location.replace("/deployment/data_view");
    const index = posts.findIndex((item) => item?.id === updatedRecord.id);
    setPost((prevList) =>
      prevList.map((item, i) => (i === index ? updatedRecord : item))
    );
  };

  const updateListRecordDelete = (id) => {
    const newdata = posts.filter((item) => item.id !== id);
    setPost(newdata);
  };

  return (
    <>
      <Card className="strpied-tabled-with-hover pr-3">
        <Card.Body className="table-full-width table-responsive px-0" style={{ padding: 0 }}>
          <Row>
            <Col md="2" className="md:min-h[400px]">
              <Card.Header>
                <Card.Title as="h4">Data View</Card.Title>
                <p className="card-category">Results : {filteredPosts?.length}</p>
                {(collectionOn && collectionIdNew !== 0) && (
                  <p className="flex items-start justify-between text-[0.65em]">
                    <span>Collection "{collectionName}"</span>
                    <span
                      className="cursor-pointer underline text-red-600"
                      onClick={() =>
                        dispatch(removeCollections({ name: "", collectionId: "" }))
                      }
                    >
                      Clear
                    </span>
                  </p>
                )}
              </Card.Header>

              <div className="text-sm pl-2 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                  <li className="me-2">
                    <a
                      href="#"
                      className="inline-block p-4 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      aria-current="page"
                    >
                      Surveys({selectedSurveys.length})
                    </a>
                  </li>
                </ul>
              </div>
              <div className="p-2 py-4">
                {uniqueSurveys.map((survey) => (
                  <div
                    key={survey}
                    className="flex items-start mb-2 p-2 pt-3 bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        checked={selectedSurveys.includes(survey)}
                        onChange={() => handleSurveyChange(survey)}
                        className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label className="ms-2 text-sm font-medium text-black">
                      {survey}
                    </label>
                  </div>
                ))}
              </div>
            </Col>
            <Col md="10" className="p-2 bg-[#f5f5f5]">
              <FilterTopNav
                selectedCategories={selectedCategories}
                uniqueCategories={uniqueCategories}
                handleCategoryChange={handleCategoryChange}
                selectedStatuses={selectedStatuses}
                uniqueStatuses={uniqueStatuses}
                handleStatusChange={handleStatusChange}
                clearFilters={clearFilters}
                handleLocationSelect={handleLocationSelect}
                setLocationFilter={setLocationFilter}
                locationFilter={locationFilter}
                handleRangeSelect={handleRangeSelect}
                dateRange={dateRange}
                handleDateRangeChange={handleDateRangeChange}
                exportToCSV={doExportToCSV}
                filteredPosts = {filteredPosts}
              />
              <br />
              {pending && (
                <div className="flex items-center justify-center mb-4">
                  <Spinner animation="grow" variant="warning" className="h-[100px]" />
                </div>
              )}
              <PostList
                posts={filteredPosts}
                pending={pending}
                deletePost={handleDelete}
                removeFromCollection={handleRemove}
                updatePostStatus={handlePostUpdateStatus}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default DataViewPage;