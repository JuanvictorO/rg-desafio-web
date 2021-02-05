import React from 'react';
// import { Link, useHistory } from 'react-router-dom';

// import { useAuth } from '../../../../hooks/auth';

import Header from '../../../../shared/components/Header';

import { Container, Content } from './styles';

const MyRecipes: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const history = useHistory();

  return (
    <Container>
      <Content />
      <Header />
    </Container>
  );
};

export default MyRecipes;
