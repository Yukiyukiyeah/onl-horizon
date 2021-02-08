import ChallengeDashboard from "../pages/challenge/ChallengeDashboard";
import CreateChallenge from "../pages/challenge/CreateChallenge";

const challengeRoutes = [
  {
    path: '/challenge',
    component: ChallengeDashboard,
    exact: true,
  },
  {
    path: '/challenge/create',
    component: CreateChallenge,
    exact: true,
  },
];

export default challengeRoutes;