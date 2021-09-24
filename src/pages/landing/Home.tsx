import * as React from 'react';

interface HomeProps {
	
}
 
const Home: React.FunctionComponent<HomeProps> = () => {
	return (
		<h1>
			Welcome User!
			{console.log('rendereed')}
		</h1>
	);
}
 
export default Home;