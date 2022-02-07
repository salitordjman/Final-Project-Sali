import React, { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
  birthday: "",
  location: "",
  status: "",
  hobbies: "",
  bio: "",
  education: "",
  youtube: "",
  facebook: "",
  linkedin: "",
  instagram: "",
  github: "",
  tiktok: "",
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch("/create-profile");

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.hobbies))
        profileData.hobbies = profileData.hobbies.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    birthday,
    location,
    status,
    hobbies,
    bio,
    education,
    youtube,
    facebook,
    linkedin,
    instagram,
    github,
    tiktok,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <section>
      <h1>{creatingProfile ? "Create Your Profile" : "Edit Your Profile"}</h1>
      <p>
        <i />
        {creatingProfile
          ? ` Let's get some information to make your`
          : " Add some changes to your profile"}
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit}>
        <div>
          <small>Birthday*</small>
          <input
            type="date"
            placeholder="* birthday"
            name="birthday"
            value={birthday}
            onChange={onChange}
          />
        </div>
        <div>
          <small>Your City & State</small>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div>
          <select name="status" value={status} onChange={onChange}>
            <option>* Select your Status</option>
            <option value="Single">Single</option>
            <option value="In a relationship">In a relationship</option>
          </select>
        </div>

        <div>
          <small>* hobbies</small>
          <input
            type="text"
            placeholder="* Hobbies"
            name="hobbies"
            value={hobbies}
            onChange={onChange}
          />
        </div>
        <div>
          <div>say something about yourself</div>
          <textarea
            placeholder="A short about yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>

        <div>
          <small>Your education</small>
          <input
            type="text"
            placeholder="education"
            name="education"
            value={education}
            onChange={onChange}
          />
        </div>

        <div>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div>
              <i />
              <input
                type="text"
                placeholder="Youtube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div>
              <i />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div>
              <i />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div>
              <i />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
            <div>
              <i />
              <input
                type="text"
                placeholder="Github URL"
                name="github"
                value={github}
                onChange={onChange}
              />
            </div>
            <div>
              <i />
              <input
                type="text"
                placeholder="Tiktok URL"
                name="tiktok"
                value={tiktok}
                onChange={onChange}
              />
            </div>
          </>
        )}

        <input type="submit" />
        <Link to="/dashboard">Go Back</Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
