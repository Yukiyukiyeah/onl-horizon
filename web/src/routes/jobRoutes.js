import CreateJobPage from "../pages/create-job/CreateJobPage";
import JobListPage from "../pages/job-list/JobListPage";
import JobDetailPage from "../pages/job-list/JobDetailPage";

const jobRoutes = [
  {
    path: '/jobs/create',
    component: CreateJobPage,
    exact: true,
  },
  {
    path: '/jobs',
    component: JobListPage,
    exact: true,
  },
  {
    path: '/jobs/detail/:id',
    component: JobDetailPage,
    exact: false,
  },
];

export default jobRoutes;