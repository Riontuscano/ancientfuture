import React, { useState ,useEffect } from 'react';
import { User, Lock, Mail, Edit, CheckCircle, FileText, Save, X } from 'lucide-react';

const UserProfile = ({mode}) => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    gender: false,
    about: false
  });

  useEffect(() => {
    document.title = "User Profile - Ancient Future profile";
    const userData = localStorage.getItem('auth-cred');
    const user = JSON.parse(userData);
    if(user){
        setUserInfo((prev) => ({
            ...prev,
            name: user.fullname,
            username: user.username,
            email: user.fullname.replace(/\s+/g, '').toLowerCase() + '@ancientfuture.com',
            gender: user.gender,
            img: user.profilePic,
            about: `Hi, I am ${user.fullname}, a software developer with 5 years of experience in web development.`
            }));
    }
    }, []);
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    email: '',
    password: '***********',
    gender: '',
    img: '',
    about: ''
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditToggle = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field]
    });
    if (isEditing[field] && field === 'password') {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value
    });
  };

  const handleSave = (field) => {
    if (field === 'password') {
      if (newPassword !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      if (newPassword.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }

      setUserInfo({ ...userInfo, password: '••••••••' });
      setNewPassword('');
      setConfirmPassword('');
    }

    setIsEditing({ ...isEditing, [field]: false });

    setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${mode ? "bg-black text-white": "text-gray-900 bg-gray-50" }  p-4`}>
      <div className="max-w-4xl w-full relative">
        {/* Profile Image - Positioned to overlap */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-12  z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
            <img 
              src= {userInfo.img ? userInfo.img : '/default-user.webp'}
              className={`relative w-52 h-52 rounded-full object-cover ${mode ? "border-4 border-gray-700 group-hover:border-blue-500":"border-4 border-gray-400 group-hover:border-blue-500"} transition-all duration-300`}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-50 w-full h-full rounded-full flex items-center justify-center">
                <Edit size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className={`${mode ? "bg-gray-800":"bg-gray-200"}  rounded-xl shadow-xl p-8 pt-24 mt-20 transform transition-all duration-300 hover:shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6`}>
          {/* User Info Header - Spans all columns */}
          <div className="col-span-full text-center mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {userInfo.name}
            </h2>
            <p className="text-gray-400">{userInfo.username}</p>
          </div>
          
          {/* Success Message - Spans all columns */}
          {successMessage && (
            <div className="col-span-full mb-6 p-3 bg-green-900 text-green-200 rounded-md flex items-center animate-fade-in">
              <CheckCircle size={18} className="mr-2 text-green-400" />
              {successMessage}
            </div>
          )}
          
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            <ProfileField
              mode={mode}
             label="Name"
              icon={<User size={18} className="text-blue-400 mr-3" />}
              value={userInfo.name}
              isEditing={isEditing.name}
              onEditToggle={() => handleEditToggle('name')}
              onSave={() => handleSave('name')}
              onChange={(value) => handleInputChange('name', value)}
            />
            
            <ProfileField
              mode={mode}
              label="Username"
              icon={<User size={18} className="text-blue-400 mr-3" />}
              value={userInfo.username}
              isEditing={isEditing.username}
              onEditToggle={() => handleEditToggle('username')}
              onSave={() => handleSave('username')}
              onChange={(value) => handleInputChange('username', value)}
            />
          </div>
          
          {/* Middle Column */}
          <div className="md:col-span-1 space-y-6">
            <ProfileField
              mode={mode}
             label="Email"
              icon={<Mail size={18} className="text-blue-400 mr-3" />}
              value={userInfo.email}
              isEditing={isEditing.email}
              onEditToggle={() => handleEditToggle('email')}
              onSave={() => handleSave('email')}
              onChange={(value) => handleInputChange('email', value)}
            />
            
            <div className="border-b border-gray-700 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock size={18} className="text-blue-400 mr-3" />
                  <span className={`text-sm ${mode ? "text-gray-400":"text-gray-900"} w-24`}>Password</span>
                </div>
                <button 
                  onClick={() => handleEditToggle('password')} 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <Edit size={18} />
                </button>
              </div>
              
              {isEditing.password ? (
                <div className="mt-3 space-y-3 animate-fade-in">
                  <input 
                    type="password" 
                    placeholder="New password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-white"
                  />
                  <input 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-white"
                  />
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => handleSave('password')} 
                      className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-md text-sm transition-all duration-200 shadow hover:shadow-lg"
                    >
                      <Save size={16} className="mr-1" /> Save
                    </button>
                    <button 
                      onClick={() => handleEditToggle('password')} 
                      className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm transition-all duration-200"
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-lg mt-2 tracking-widest">{userInfo.password}</p>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="border-b border-gray-700 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User size={18} className="text-blue-400 mr-3" />
                  <span className={`text-sm ${mode ? "text-gray-400":"text-gray-900"} w-24`}>Gender</span>
                </div>
                <button 
                  onClick={() => handleEditToggle('gender')} 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <Edit size={18} />
                </button>
              </div>

              {isEditing.gender ? (
                <div className="mt-3 animate-fade-in">
                  <select
                    value={userInfo.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => handleSave('gender')} 
                      className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-md text-sm transition-all duration-200 shadow hover:shadow-lg"
                    >
                      <Save size={16} className="mr-1" /> Save
                    </button>
                    <button 
                      onClick={() => handleEditToggle('gender')} 
                      className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm transition-all duration-200"
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-lg mt-2">{userInfo.gender}</p>
              )}
            </div>
          </div>
          
          {/* About - Spans all columns */}
          <div className="col-span-full">
            <ProfileField
              mode={mode}
label="About"
              icon={<FileText size={18} className="text-blue-400 mr-3" />}
              value={userInfo.about}
              isEditing={isEditing.about}
              onEditToggle={() => handleEditToggle('about')}
              onSave={() => handleSave('about')}
              onChange={(value) => handleInputChange('about', value)}
              isTextarea
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Profile Field Component
const ProfileField = ({ label, icon, value, isEditing, onEditToggle, onSave, onChange, isTextarea = false,mode }) => (
  <div className="border-b border-gray-700 pb-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {icon}
        <span className={`text-sm ${mode ? "text-gray-400":"text-black"}  w-24`}>{label}</span>
      </div>
      <button 
        onClick={onEditToggle} 
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        <Edit size={18} />
      </button>
    </div>
    {isEditing ? (
      <div className="mt-3 animate-fade-in">
        {isTextarea ? (
          <textarea 
            className={`w-full p-3 ${mode ? "text-white bg-gray-700 border border-gray-600":"text-black bg-gray-200 border border-gray-400"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 min-h-32 resize-y`}
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
          />
        ) : (
          <input 
            type="text" 
            className={`w-full p-2 ${mode ? "text-white bg-gray-700 border border-gray-600":"text-black bg-gray-200 border border-gray-400"}  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
          />
        )}
        <div className="flex gap-2 mt-2">
          <button 
            onClick={onSave} 
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-md text-sm transition-all duration-200 shadow hover:shadow-lg"
          >
            <Save size={16} className="mr-1" /> Save
          </button>
          <button 
            onClick={onEditToggle} 
            className={`flex items-center ${mode ? "bg-gray-700 hover:bg-gray-600":"bg-gray-200 hover:bg-gray-100"}  px-4 py-2 rounded-md text-sm transition-all duration-200`}
          >
            <X size={16} className="mr-1" /> Cancel
          </button>
        </div>
      </div>
    ) : (
      <p className="text-lg mt-2">{value}</p>
    )}
  </div>
);
export default UserProfile;