// import React from "react";
// import DataTable from 'react-data-table-component';
// // import Container from 'react-bootstrap/Container';
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';

// const Team = ({ players }) => {
//   const draftedPlayers = players ? players.filter(p => p.drafted) : [];
//   const columns = [
//     {
//       name: 'Rank',
//       selector: 'vrank',
//       sortable: true,
//     },
//     {
//       name: 'Pos Rank',
//       selector: 'displayPosition',
//       sortable: true,
//     },
//     {
//       name: 'Name',
//       selector: 'name',
//       sortable: true,
//     },
//     {
//       name: 'PPG',
//       selector: 'ppg',
//       sortable: true,
//     }
//   ];
//   return (
//     // <Container>
//     //   <Row>
//     //     <Col xs={9}>
//           <DataTable
//             title="Drafted Players"
//             columns={columns}
//             data={draftedPlayers}
//           />
//     //     </Col>
//     //     <Col>Targets</Col>
//     //   </Row>
//     // </Container>
//   );
// }

// export default Team;
