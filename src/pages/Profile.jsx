import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Mail,
  ArrowLeft,
  Package,
  Heart,
  ArrowRight,
} from "lucide-react";
import {
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../store/authSlice";
import toast from "react-hot-toast";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import QuickActions from "../components/profile/QuickActions";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.products);

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    currentPassword: "",
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ firstName: "", lastName: "", currentPassword: "" });
    } else {
      const currentName = user.displayName || "";
      const nameParts = currentName.split(" ");
      setEditData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        currentPassword: "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!editData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!editData.currentPassword) {
      toast.error("Current password is required to update profile");
      return;
    }

    setIsUpdating(true);

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        editData.currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      const newDisplayName =
        `${editData.firstName.trim()} ${editData.lastName.trim()}`.trim();
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });

      dispatch(setUser({ ...user, displayName: newDisplayName }));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setEditData({ firstName: "", lastName: "", currentPassword: "" });
    } catch (error) {
      console.error("Profile update error:", error);

      if (error.message.includes("wrong-password")) {
        toast.error("Current password is incorrect");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-16">
        <div className="card p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to view your profile and manage your account.
          </p>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      icon: <Package className="h-5 w-5" />,
      title: "Order History",
      desc: "Track your past orders",
      count: "0",
      showArrow: false,
      action: () => toast.info("Order history coming soon!"),
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "My Wishlist",
      desc: "Items you saved for later",
      count: wishlist.length,
      showArrow: true,
      action: () => handleNavigation("/wishlist"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <ProfileHeader
        user={user}
        isEditing={isEditing}
        onEditToggle={handleEditToggle}
      />

      {isEditing && (
        <ProfileEditForm
          editData={editData}
          onChange={handleInputChange}
          onSubmit={handleUpdateProfile}
          onCancel={handleEditToggle}
          isUpdating={isUpdating}
        />
      )}

      <QuickActions actions={quickActions} />

      {wishlist.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Wishlist Items
            </h2>
            <button
              onClick={() => handleNavigation("/wishlist")}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1"
            >
              <span>View All ({wishlist.length})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => handleNavigation(`/product/${item.id}`)}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                    {item.name.length > 30
                      ? item.name.substring(0, 30) + "..."
                      : item.name}
                  </h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
