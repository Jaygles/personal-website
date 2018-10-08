import Posts from '../components/Posts';

const Home = props => (
  <div>
    <Posts page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;
