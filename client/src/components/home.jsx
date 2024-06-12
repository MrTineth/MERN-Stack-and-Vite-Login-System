import { useEffect, useState } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="container">
      <h1>Welcome, {userName}!</h1>
    </div>
  );
}

