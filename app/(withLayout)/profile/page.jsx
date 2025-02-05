"use client";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import TextInput from "@/components/input/TextInput";
import Button from "@/components/input/Button";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    email: "saul.ramirez@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();

    // Append profile data
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append profile picture if it exists
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/edit-profile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle successful update
        console.log("Profile updated successfully");
      } else {
        // Handle error
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Section - Moved to top for mobile */}
        <div className="mb-8 lg:hidden">
          <div className="bg-gray-100 w-56 h-56 mx-auto rounded-lg p-4 aspect-square flex flex-col items-center justify-center relative group cursor-pointer">
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />
            <BiImageAdd className="w-12 h-12 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
            <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors text-center">
              {profilePicture ? profilePicture.name : "Upload Profile Picture"}
            </p>
          </div>
        </div>

        {/* Personal Details Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
              />
              <TextInput
                label="Street"
                name="street"
                value={profileData.street}
                onChange={handleInputChange}
              />
              <TextInput
                label="City"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
              />
              <TextInput
                label="State/Province"
                name="state"
                value={profileData.state}
                onChange={handleInputChange}
              />
              <TextInput
                label="Postcode"
                name="postcode"
                value={profileData.postcode}
                onChange={handleInputChange}
              />
            </div>

            {/* Profile Picture Section - Hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-gray-100 w-56 h-56 rounded-lg p-4 aspect-square flex flex-col items-center justify-center relative group cursor-pointer">
                <input
                  type="file"
                  id="profilePictureLg"
                  name="profilePicture"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleFileChange}
                />
                <BiImageAdd className="w-12 h-12 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
                 
              </div>
            </div>
          </div>
          <div className="pt-5">
            <Button type="submit" variant="primary" size="md">
              Save Changes
            </Button>
          </div>
          <hr className="mt-5" />
        </section>

        {/* Login Details Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Login Details</h2>
          <div className="max-w-md space-y-4">
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled
            />
            <TextInput
              label="Current Password"
              name="currentPassword"
              type="password"
              value={profileData.currentPassword}
              onChange={handleInputChange}
            />
            <TextInput
              label="New Password"
              name="newPassword"
              type="password"
              value={profileData.newPassword}
              onChange={handleInputChange}
            />
            <TextInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={profileData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="pt-5">
            <Button type="submit" variant="primary-outline" size="md">
              Change Password
            </Button>
          </div>
          <hr className="mt-5" />
        </section>

        {/* Submit and Logout Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => {
              // Handle logout logic here
              console.log("Logout clicked");
            }}
          >
            Logout
            <IoLogOutOutline className="inline-block w-5 h-5 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}
