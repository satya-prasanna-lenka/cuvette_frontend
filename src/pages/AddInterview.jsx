import { IoIosRemoveCircle } from "react-icons/io";
import "../assets/css/addSection.css";
import axios from "axios"; // Assuming you want to make an API call
import { useEffect, useState } from "react";
import { endPoints } from "../config/appConfig";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const AddInterview = () => {
  // State management for the form fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [candidateInput, setCandidateInput] = useState("");
  const [endDate, setEndDate] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to add a new candidate email to the list
  const handleAddCandidate = () => {
    if (candidateInput && !candidates.includes(candidateInput)) {
      setCandidates([...candidates, candidateInput]);
      setCandidateInput(""); // Clear input after adding
    }
  };

  // Function to remove a candidate from the list
  const handleRemoveCandidate = (emailToRemove) => {
    setCandidates(candidates.filter((email) => email !== emailToRemove));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    const formData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates: candidates.map((email) => ({ email })),
      endDate,
    };
    const url = endPoints().addInterviewUrl;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // positionId: positionId,
        },
      });
      if (response.status === 200) {
        toast.success("Interview created and emails sent successfully!");
        // Reset the form after successful submission
        setJobTitle("");
        setJobDescription("");
        setExperienceLevel("");
        setCandidates([]);
        setEndDate("");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating interview:", error);
      toast.error("Failed to create interview.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));

    setToken(token);
  }, []);
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="addSection">
      <div className="addBox">
        <div className="addInput">
          <span>Job Title</span>
          <input
            type="text"
            placeholder="Enter job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="addInput">
          <span>Job Description</span>
          <textarea
            placeholder="Enter job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="addInput">
          <span>Experience Level</span>
          <select
            className="form-select"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="" disabled>
              Select experience level
            </option>
            <option value="0-1">0-1</option>
            <option value="1-2">1-2</option>
            <option value="2-3">2-3</option>
            <option value="3-4">3-4</option>
            <option value="4-5">4-5</option>
          </select>
        </div>
        <div className="addInput">
          <span>Add Candidate</span>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            value={candidateInput}
            onChange={(e) => setCandidateInput(e.target.value)}
          />
          <button type="button" onClick={handleAddCandidate} className="addbtn">
            Add
          </button>
        </div>

        {/* Display added candidates with remove functionality */}
        {candidates.length > 0 && (
          <div className="candidateList">
            <ul>
              {candidates.map((email, index) => (
                <li key={index}>
                  {email}

                  <IoIosRemoveCircle
                    style={{
                      marginLeft: "5px",
                      position: "relative",
                      top: "3px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveCandidate(email)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="addInput" style={{ marginTop: "20px" }}>
          <span>End Date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="submitBtnContainer">
            <button className="sendBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInterview;
