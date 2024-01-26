import MenubarAdmin from "../../layouts/MenubarAdmin";

const Home = () => {
  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>Home Admin</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
