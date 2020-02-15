import HomeContainer from './Home/HomeContainer';
import LoginContainer from './Login/LoginContainer';
import SignupContainer from './Signup/SignupContainer';
import CommunitiesContainer from './Communities/CommunitiesContainer';
import CreateContainer from './Create/CreateContainer';
import CreateCommunityContainer from './CreateCommunity/CreateCommunityContainer';
import CommunityContainer from './Community/CommunityContainer';
import CreatePostContainer from './CreatePost/CreatePostContainer';
import PostContainer from './Post/PostContainer';

const views = {
	Home: HomeContainer,
	Login: LoginContainer,
	Signup: SignupContainer,
	Communities: CommunitiesContainer,
	Create: CreateContainer,
	CreateCommunity: CreateCommunityContainer,
	Community: CommunityContainer,
	CreatePost: CreatePostContainer,
	Post: PostContainer,
};

export default views;
