import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import { Button } from 'reactstrap';

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Link href="/">
        <Button color="primary">voltar</Button>
      </Link>
  </div>
);

export default Dashboard;