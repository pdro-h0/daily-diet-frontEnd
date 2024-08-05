import { Outlet, useNavigate } from 'react-router-dom';
import ArrowBack from "@mui/icons-material/ArrowBack";

interface DefaultLayoutProps{
    className: string
    title: string
}

const DefaultLayout = ({ className, title }: DefaultLayoutProps) => {
    const navigate = useNavigate();

  return (
    <div>
      <h1 className={`${className} h-32 text-center py-5 font-bold relative`}>
        {title}
        <span
          className="absolute top-4 left-6"
          onClick={() => navigate("/diet-details")}
        >
          <ArrowBack fontSize="medium" color="action" />
        </span>
      </h1>

      <Outlet />
    </div>
  );
}

export default DefaultLayout