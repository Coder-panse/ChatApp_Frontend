import React, { useContext, useEffect, useState } from "react";
import { User, Mail, Globe, Camera, Check, Edit2, Save, X } from "lucide-react";
import { userInfo } from "@/Context/UserContext";
import { selectedUser } from "@/Context/SelectUserContext";
import axios from "axios";

const Profile = () => {
  const [language, setLanguage] = useState();
  const { selectedUserData, setUserLanguage, userDetail } = useContext(userInfo);
  const { setselectedUserData } = useContext(selectedUser);
  const [isEditing, setIsEditing] = useState(false);


  const [image, setImage] = useState("")



  const languages = [
    "Default",
    "English",
    "Hindi",
    "Marathi",
    "Gujarati",
    "Rajasthani",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Arabic",
    "Portuguese",
    "Russian",
  ];


  const handleLanguage = async (lang) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/language",
        { Language: lang },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Profile Card */}
        <div className="bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-800">
          {/* Profile Content */}
          <div className="p-8">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-neutral-800 ring-2 ring-neutral-800 ring-offset-4 ring-offset-neutral-900">
                  {userDetail.image ? (
                    <img
                      src={`http://localhost:3000/images/${userDetail}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                      <User className="w-12 h-12 text-neutral-600" />
                    </div>
                  )}
                </div>

                {/* Camera Button */}
                <label className="absolute bottom-0 right-0 w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-lg">
                  <Camera className="w-4 h-4 text-neutral-900" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                   
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-5">
              {/* Username */}
              <div className="space-y-2">
                <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 mr-2" />
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={upProfile.username}
                    onChange={(e)=>setupProfile(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
                  />
                ) : (
                  <div className="px-4 py-3 bg-neutral-800 rounded-xl text-white border border-neutral-800">
                    {userDetail.username}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5 mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={userDetail.email}
                    disabled
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
                  />
                ) : (
                  <div className="px-4 py-3 bg-neutral-800 rounded-xl text-white border border-neutral-800">
                    {userDetail.email}
                  </div>
                )}
              </div>

              {/* Language */}
              {/* <div className="space-y-2">
                <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 mr-2" />
                  Language
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowLanguageDropdown(!showLanguageDropdown)
                    }
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-800 rounded-xl text-white text-left focus:outline-none focus:border-neutral-700 transition-all flex items-center justify-between hover:bg-neutral-800/80"
                  >
                    {profile.language}
                    <svg
                      className="w-4 h-4 text-neutral-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showLanguageDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl max-h-72 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setProfile({ ...profile, language: lang });
                            setShowLanguageDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-neutral-700 transition-colors flex items-center justify-between first:rounded-t-xl last:rounded-b-xl"
                        >
                          {lang}
                          {profile.language === lang && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}

              <div className="space-y-2">
                <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 mr-2" />
                  Language
                </label>
                <button
                  onClick={() => setShowLanguageModal(true)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-800 rounded-xl text-white text-left focus:outline-none focus:border-neutral-700 transition-all flex items-center justify-between hover:bg-neutral-800/80"
                >
                  {userDetail.language}
                  <svg
                    className="w-4 h-4 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Language Modal */}
                {showLanguageModal && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl w-[90%] max-w-md p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white font-semibold text-lg">
                          Choose Language
                        </h2>
                        <button
                          onClick={() => setShowLanguageModal(false)}
                          className="text-neutral-400 hover:text-white transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="max-h-80 overflow-y-auto space-y-2">
                        {languages.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setProfile({ ...profile, language: lang });
                              setShowLanguageModal(false);
                              handleLanguage(lang);
                            }}
                            className={`w-full px-4 py-3 rounded-xl text-left text-white flex items-center justify-between hover:bg-neutral-800 transition ${
                              profile.language === lang
                                ? "bg-neutral-800 border border-neutral-700"
                                : ""
                            }`}
                          >
                            {lang}
                            {profile.language === lang && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          onClick={() => setShowLanguageModal(false)}
                          className="px-5 py-2 bg-white text-neutral-900 rounded-xl font-medium hover:bg-neutral-100 transition"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex-1 px-5 py-3 bg-white text-neutral-900 rounded-xl font-medium hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-5 py-3 bg-neutral-800 text-white rounded-xl font-medium hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 border border-neutral-700"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full px-5 py-3 bg-white text-neutral-900 rounded-xl font-medium hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
