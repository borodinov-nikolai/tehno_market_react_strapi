import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/esm/Container';

function HeaderMenu() {
  return (
    <Container>
        <Tabs
            
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Смартфоны">
          </Tab>
          <Tab eventKey="profile" title="Планшеты">
          </Tab>
          <Tab eventKey="contact" title="">
          </Tab>
        </Tabs>
    </Container>
  );
}

export default HeaderMenu;