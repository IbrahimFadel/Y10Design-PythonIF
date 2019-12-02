import Home from './Home/Home';
import LoginContainer from './Login/LoginContainer';
import SignupContainer from './Signup/SignupContainer';
import CommunitiesContainer from './Communities/CommunitiesContainer';
import CreateContainer from './Create/CreateContainer';
import CreateCommunityContainer from './CreateCommunity/CreateCommunityContainer';

const views = {
	Home: Home,
	Login: LoginContainer,
	Signup: SignupContainer,
	Communities: CommunitiesContainer,
	Create: CreateContainer,
	CreateCommunity: CreateCommunityContainer,
};

export default views;
