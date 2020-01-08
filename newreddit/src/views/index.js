import Home from './Home/Home';
import LoginContainer from './Login/LoginContainer';
import SignupContainer from './Signup/SignupContainer';
import CommunitiesContainer from './Communities/CommunitiesContainer';
import CreateContainer from './Create/CreateContainer';
import CreateCommunityContainer from './CreateCommunity/CreateCommunityContainer';
import CommunityContainer from './Community/CommunityContainer';
import PostContainer from './Post/PostContainer';

const views = {
	Home: Home,
	Login: LoginContainer,
	Signup: SignupContainer,
	Communities: CommunitiesContainer,
	Create: CreateContainer,
	CreateCommunity: CreateCommunityContainer,
	Community: CommunityContainer,
	Post: PostContainer,
};

export default views;
