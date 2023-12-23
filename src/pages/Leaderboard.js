import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Leaderboard = () => {
  const [leaderboardList, setLeaderboardList] = useState([]);

  const leaderboardCollectionRef = collection(db, "leaderboard");

  useEffect(() => {
    const getLeaderboardList = async () => {
      try {
        const data = await getDocs(leaderboardCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data()
        }));
        setLeaderboardList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getLeaderboardList();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {leaderboardList.map((doc, index) => (
        <h3 className="display" key={index}>{doc.name} - {doc.time}</h3>
      ))}
    </div>
  );
  
}

export default Leaderboard;
