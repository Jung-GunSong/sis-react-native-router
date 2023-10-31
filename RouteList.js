import { Route, Routes, Navigate } from "react-router-native";
import { StyleSheet, Text, View } from 'react-native';
import Login from "./Login";

function RouteList(){


  return (
      <Routes>
        <Route path="/"
          element={<Login />} />
      </Routes>
  )
}

export default RouteList