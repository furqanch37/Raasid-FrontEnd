import MainNavigation from './MainNavigation';
import Topbar from './Topbar';
import './style.css';
const index = () => {
  return (
    <header>
      <Topbar />
      <MainNavigation />
    </header>
  );
};

export default index;
