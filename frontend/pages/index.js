import Posts from '../components/Posts';

const Home = props => (
  <>
    <Posts page={parseFloat(props.query.page) || 1} />
  </>
);

export default Home;
