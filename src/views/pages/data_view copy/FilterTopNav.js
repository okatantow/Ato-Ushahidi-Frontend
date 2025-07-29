
import React, { useState, useRef } from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import AutocompleteLocationSearch from "./AutocompleteLocationSearch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import { RxDashboard } from "react-icons/rx";


function FilterTopNav(props) {
    const [query, setQuery] = useState(""); // State for the input value
    const autocompleteRef = useRef(null); // Ref to interact with the child component

    // Function to clear filters
    const clearFilters = () => {
        setQuery(""); // Clear the query state
        if (autocompleteRef.current) {
            autocompleteRef.current.focus(); // Optionally focus the input field
        }
        props.handleLocationSelect(null, null);
        // Add other filter-clearing logic here if needed
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary p-0">
                <Container fluid>
                    {/* <Navbar.Brand href="#" className="mr-2">Filters</Navbar.Brand> */}
                    <Nav>
                        <NavDropdown title={"Filters"} id="navbarFilter" className="">
                            
                        <NavDropdown.Item  ><div className="flex items-start gap-2" ><RxDashboard /> <span>Add To Collection</span></div></NavDropdown.Item>
                        <NavDropdown.Item  onClick={() => props.exportToCSV()}><div className="flex items-start gap-2" >
                        <i className="fas fa-download me-2"></i>
                            <span> Export Selected ({props.filteredPosts.length})</span>
                           
                            </div>
                            </NavDropdown.Item>




                        </NavDropdown>
                    </Nav>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto flex items-start justify-between md:w-[80%]" navbarScroll>
                            <NavDropdown title={"Status(" + props?.selectedStatuses.length + ")"} id="navbarStatus" className="border-l border-grey-500">
                                {props?.uniqueStatuses.map((status) => (
                                    <NavDropdown.Item href="#action3" >
                                        <div key={status} className="flex items-start mb-2 p-2 pt-3 bg-gray-100 cursor-pointer">
                                            <div className="flex items-center h-5">
                                                <input type="checkbox"
                                                    checked={props?.selectedStatuses.includes(status)}
                                                    onChange={() => props?.handleStatusChange(status)} className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <label for="published" className="ms-2 text-sm font-medium text-black">{status}
                                            </label>
                                        </div>
                                    </NavDropdown.Item>
                                ))}




                            </NavDropdown>

                            <NavDropdown title={"Category(" + props?.selectedCategories.length + ")"} id="navbarCategory" className="border-l border-grey-500">


                                {props?.uniqueCategories.map((category) => (<>

                                    <NavDropdown.Item href="#action3" >
                                        <div key={category} className="flex items-start mb-2 p-2 pt-3 bg-gray-100 cursor-pointer">
                                            <div className="flex items-center h-5">
                                                <input type="checkbox"
                                                    checked={props.selectedCategories.includes(category)}
                                                    onChange={() => props.handleCategoryChange(category)} className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <label for="published" className="ms-2 text-sm font-medium text-black">{category}
                                            </label>
                                        </div>
                                    </NavDropdown.Item>
                                </>))}



                            </NavDropdown>

                            <NavDropdown title="Date Range" id="navbarDateRange" className="border-l border-grey-500 custom-dropdown">

                                <div className="min-h-[50px] pt-3">
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={props.dateRange[0]}
                                        endDate={props.dateRange[1]}
                                        onChange={props.handleDateRangeChange}
                                        isClearable={true}
                                        placeholderText="Select a date range"
                                    />

                                </div>
                            </NavDropdown>
                            <NavDropdown title="Location" id="navbarLocation" className="border-l border-grey-500 custom-dropdown">
                                <div className="text-right text-red-500 underline cursor-pointer" onClick={clearFilters}>
                                    clear
                                </div>
                                <div className="min-h-[200px] pt-3">
                                    <label>City Or Address</label>
                                    <AutocompleteLocationSearch
                                        query={query} // Pass query state
                                        onQueryChange={setQuery} // Pass setter for query
                                        onLocationSelect={props.handleLocationSelect}
                                        ref={autocompleteRef} // Pass ref to child
                                    />
                                    <br />
                                    <select
                                        value={props?.locationFilter?.range || ""}
                                        onChange={props.handleRangeSelect}
                                        className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none hover:bg-gray-50 cursor-pointer"
                                    >
                                        <option value="1">Within 1 km</option>
                                        <option value="2">Within 2 km</option>
                                        <option value="5">Within 5 km</option>
                                        <option value="10">Within 10 km</option>
                                        <option value="20">Within 20 km</option>
                                        <option value="50">Within 50 km</option>
                                        <option value="100">Within 100 km</option>
                                        <option value="500">Within 500 km</option>
                                        <option value="1000">Within 1000 km</option>
                                    </select>
                                </div>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Button onClick={props.clearFilters} variant="outline-success">
                                Clear Filters
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default FilterTopNav;