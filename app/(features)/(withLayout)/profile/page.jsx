"use client";
import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import TextInput from "@/components/input/TextInput";
import Button from "@/components/input/Button";
import { logout, useAuth } from "@/utils/functions";
import { FetchApi } from "@/utils/FetchApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/AuthSlice";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth?._id) return router.push("/");
  }, []);
  const [profileData, setProfileData] = useState({
    firstName: auth?.firstName || "",
    lastName: auth?.lastName || "",
    street: auth?.street || "",
    city: auth?.city || "",
    state_province: auth?.state_province || "",
    postCode: auth?.postCode || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    auth?.profilePicture
      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_API}${auth?.profilePicture}`
      : ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    try {
      const { data } = await FetchApi({
        url: `/auth/update-profile/${auth?._id}`,
        method: "put",
        data: formData,
        isToast: true,
      });
      dispatch(setAuth({ ...auth, ...data?.data }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    // Validate password fields (ensure new and confirm password match)
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("New password and confirm password must match");
    }

    try {
      const { data } = await FetchApi({
        url: `/auth/change-password/${auth?._id}`,
        method: "post",
        data: {
          email: auth?.email,
          oldPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        callback: () => {
          setPasswordData({
            confirmPassword: "",
            currentPassword: "",
            newPassword: "",
          });
        },
        isToast: true,
      });
    } catch (error) {
      console.error("Error changing password:", error);
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
            {profilePicturePreview ? (
              <Image
                width={200}
                height={200}
                src={profilePicturePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <BiImageAdd className="w-12 h-12 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
                <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors text-center">
                  Upload Profile Picture
                </p>
              </>
            )}
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
                name="state_province"
                value={profileData.state_province}
                onChange={handleInputChange}
              />
              <TextInput
                label="Postcode"
                name="postCode"
                value={profileData.postCode}
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
                {profilePicturePreview ? (
                  <Image
                    width={200}
                    height={200}
                    src={profilePicturePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <BiImageAdd className="w-12 h-12 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors text-center">
                      Upload Profile Picture
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="pt-5">
            <Button type="submit" variant="primary" size="md">
              Save Changes
            </Button>
          </div>
          <hr className="my-5" />
        </section>
      </form>
      <form onSubmit={handlePasswordSubmit} className="space-y-8">
        {/* Login Details Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Login Details</h2>
          <div className="max-w-md space-y-4">
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              value={auth?.email}
              onChange={handleInputChange}
              disabled
            />
            <TextInput
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            <TextInput
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <TextInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="pt-5">
            <Button type="submit" variant="primary-outline" size="md">
              Change Password
            </Button>
          </div>
          <hr className="my-5" />
        </section>
      </form>
      {/*   Logout Button */}
      <div className="flex flex-wrap gap-4">
        <Button type="button" variant="primary" size="md" onClick={logout}>
          Logout
          <IoLogOutOutline className="inline-block w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
