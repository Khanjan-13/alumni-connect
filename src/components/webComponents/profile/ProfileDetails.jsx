import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    marital_status: "",
    dob: "",
    taluka: "",
    district: "",
    postal_code: "",
    state: "",
    country: "",
    alternate_email: "",
    institution_name: "Birla Vishvakarma Mahavidyalaya",
    degree: "",
    admission_year: "",
    graduation_year: "",
    branch: "",
    current_address: "",
    office_address: "",
    contact_number: "",
    alternate_contact_number: "",
    bio: "",
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
   

    const fetchProfileData = async () => {
      try {
        if (!token) {
          toast.error("Authentication token is missing. Please log in again.");
          return;
        }
        if (!userId) {
          toast.error("User ID is missing. Please log in again.");
          return;
        }
        const response = await axios.get(
          `https://alumni-backend-drab.vercel.app/api/users/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setFormData((prevState) => ({
            ...prevState,
            ...(response.data.data.profileData || {}), // Ensure profileData is an object
          }));
        } else {
          toast.error("Failed to load profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error(
          error.response?.data?.message || "Error loading profile data."
        );
      }
    };

    fetchProfileData();
  }, [token, userId]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        toast.error("Authentication token is missing. Please log in again.");
        return;
      }
      if (!userId) {
        toast.error("User ID is missing. Please log in again.");
        return;
      }

      const payload = {
        user_id: userId,
        name: formData.name || "",
        gender: formData.gender || "",
        marital_status: formData.marital_status || "",
        dob: formData.dob || "",
        taluka: formData.taluka || "",
        district: formData.district || "",
        postal_code: formData.postal_code || "",
        state: formData.state || "",
        country: formData.country || "",
        alternate_email: formData.alternate_email || "",
        institution_name: formData.institution_name || "Birla Vishvakarma Mahavidyalaya",
        degree: formData.degree || "",
        admission_year: formData.admission_year || "",
        graduation_year: formData.graduation_year || "",
        branch: formData.branch || "",
        current_address: formData.current_address || "",
        office_address: formData.office_address || "",
        contact_number: formData.contact_number || "",
        alternate_contact_number: formData.alternate_contact_number || "",
        bio: formData.bio || "",
      };
      

      const response = await axios.post(
        `https://alumni-backend-drab.vercel.app/api/users/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data?.message || "Failed to update profile.");
      }
    }  catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
    
  };

  return (
    <div className="mx-auto">
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitForm}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            {/* <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={inputHandler}
          className="w-full p-2 border rounded-lg bg-gray-200"
        />
      </div> */}

            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Marital Status</label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth</label>
              <Input
                type="date"
                name="dob"
                value={formData.dob?.split("T")[0] || ""}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Taluka</label>
              <Input
                type="text"
                name="taluka"
                value={formData.taluka}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">District</label>
              <Input
                type="text"
                name="district"
                value={formData.district}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Postal Code</label>
              <Input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">State</label>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Alternate Email</label>
              <Input
                type="text"
                name="alternate_email"
                value={formData.alternate_email}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Institution Name</label>
              <Input
                type="text"
                name="institution_name"
                value={formData.institution_name}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Degree</label>
              <Input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Admission Year</label>
              <Input
                type="number"
                name="admission_year"
                value={formData.admission_year}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Graduation Year</label>
              <Input
                type="number"
                name="graduation_year"
                value={formData.graduation_year}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Branch</label>
              <Input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Current Address</label>
              <Input
                type="text"
                name="current_address"
                value={formData.current_address}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Office Address</label>
              <Input
                type="text"
                name="office_address"
                value={formData.office_address}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
              />
            </div>


            <div className="mb-4">
              <label className="block text-gray-700">Contact Number</label>
              <Input
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Alternate Contact Number
              </label>
              <Input
                type="text"
                name="alternate_contact_number"
                value={formData.alternate_contact_number}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
              />
            </div>


            {/* <div className="mb-4">
        <label className="block text-gray-700">City</label>
        <Input
          type="text"
          name="city"
          value={formData.city || ""}
          onChange={inputHandler}
          className="w-full p-2 border rounded-lg"
        />
      </div> */}

          

            <div className="mb-4">
              <label className="block text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={inputHandler}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
