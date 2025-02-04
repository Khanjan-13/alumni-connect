import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import toast, { Toaster } from "react-hot-toast";

function ProfileSkill() {
  const [skills, setSkills] = useState([]); // Store added skills
  const [userId, setUserId] = useState(null); // Store user ID from localStorage
  const [formData, setFormData] = useState({
    user_id: "", // Include user_id
    skill_name: "",
    proficiency_level: "",
  });

  // Fetch user ID from localStorage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
      setFormData((prevData) => ({ ...prevData, user_id: storedUserId }));
      fetchUserSkills(storedUserId);
    } else {
      toast.error("User ID not found. Please log in again.");
    }
  }, []);

  // Fetch existing user skills
  const fetchUserSkills = async (userId) => {
    try {
      if (!userId) {
        console.error("User ID is missing. Cannot fetch skills.");
        return;
      }
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        toast.error("Authentication token missing. Please log in.");
        return;
      }
  
      const response = await axios.get(
        `https://alumni-backend-drab.vercel.app/api/users/skills/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Fetched Skills:", response.data); // Debugging
  
      if (response.data && Array.isArray(response.data.data)) {
        setSkills(response.data.data); // Accessing the correct array
      } else {
        toast.error("Failed to fetch skills.");
        setSkills([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Failed to fetch skills:", error.response?.data || error.message);
      toast.error("Something went wrong.");
      setSkills([]); // Prevent undefined errors
    }
  };
  
  

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, skill_name: e.target.value });
  };

  // Handle dropdown selection
  const handleProficiencyChange = (value) => {
    setFormData({ ...formData, proficiency_level: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.skill_name || !formData.proficiency_level) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        toast.error("Authentication token missing. Please log in.");
        return;
      }

      // Ensure `user_id` is included in the request payload
      const payload = {
        user_id: userId,
        skill_name: formData.skill_name,
        proficiency_level: formData.proficiency_level,
      };

      const response = await axios.post(
        "https://alumni-backend-drab.vercel.app/api/users/skills",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Debugging: Check response data in console

      if (response.data.success) {
        toast.success("Skill added successfully!");

        setSkills([...skills, payload]); // Update UI dynamically
        setFormData({ user_id: userId, skill_name: "", proficiency_level: "" }); // Reset form but retain user_id
      } else {
        toast.error(response.data.message || "Failed to add skill.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message); // Debugging: Log error details
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Add Your Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Skill Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skill Name
              </label>
              <Input
                type="text"
                placeholder="Enter skill (e.g., JavaScript)"
                value={formData.skill_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Proficiency Level Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Proficiency Level
              </label>
              <Select
                onValueChange={handleProficiencyChange}
                value={formData.proficiency_level}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="rounded-sm bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Skill
            </Button>
          </form>

          <Separator className="my-4" />

          {/* Display Added Skills */}
          <h3 className="text-lg font-semibold mb-2">Your Skills</h3>
          {skills.length === 0 ? (
            <p className="text-gray-500">No skills added yet.</p>
          ) : (
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-100 p-2 rounded-md"
                >
                  <span className="font-medium">{skill.skill_name}</span>
                  <span className="text-sm text-gray-700">
                    {skill.proficiency_level}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileSkill;
