import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

function MyRefreshControl({ onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh(() => {
      // After the refresh is complete, set refreshing back to false
      setRefreshing(false);
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}

export default MyRefreshControl;