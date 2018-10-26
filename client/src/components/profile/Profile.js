import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="row profile">
      <div className="col-lg-4 col-md-6 col-sm-12 profile-col">
        <Link className="prof-col prof-one text-dark shadow" to="/register">
          <h4>Lägg till Profil</h4>
        </Link>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12 profile-col">
        <Link className="prof-col prof-two text-dark shadow" to="/product/new">
          <h4>Lägg till Produkt</h4>
        </Link>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12 profile-col">
        <Link className="prof-col prof-three text-dark shadow" to="/register">
          <h4>Lägg till Kategori</h4>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
