// @ts-nocheck
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, ChevronLeft, User, CheckCircle2, AlertTriangle, Clock, Map, Users, Bell, UserCircle, Plus } from 'lucide-react-native';

const STUDENTS = [
  { id: 'SC4821', name: 'Hasara', status: 'Boarded', color: '#4ADE80' },
  { id: 'SC3958', name: 'Amoda', status: 'Pending', color: '#94A3B8' },
  { id: 'SC5012', name: 'Nishantha', status: 'Absent', color: '#F87171' },
  { id: 'SC6145', name: 'Joanne', status: 'Boarded', color: '#4ADE80' },
];

const StudentCard = ({ item }: any) => (
  <View style={styles.card}>
    <View style={styles.avatarContainer}><User color="black" size={40} /></View>
    <View style={styles.infoContainer}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.idLabel}>Student ID: #{item.id}</Text>
    </View>
    <View style={styles.statusSection}>
      <View style={[styles.statusBadge, { backgroundColor: item.color + '20' }]}>
        <View style={[styles.dot, { backgroundColor: item.color }]} />
        <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
      </View>
      {item.status === 'Absent' ? (
        <AlertTriangle color="#FACC15" size={24} />
      ) : item.status === 'Pending' ? (
        <Clock color="#F59E0B" size={24} />
      ) : (
        <CheckCircle2 color="#22C55E" size={24} />
      )}
    </View>
  </View>
);

const NavButton = ({ icon, label, color, active, onPress }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.navItem, active && styles.activeNavItem]}>
    {React.cloneElement(icon, { color: active ? '#1E40AF' : color })}
    <Text style={[styles.navText, { color: active ? '#1E40AF' : color }]}>{label}</Text>
  </TouchableOpacity>
);

export default function Absence() {
  const navigation: any = useNavigation();
  const [query, setQuery] = useState('');

  const filteredStudents = STUDENTS.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  const handleAddAbsence = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('AddAbsence');
      return;
    }
    console.log('Add absence');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><ChevronLeft color="black" size={28} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Students</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.blueContent}>
        <View style={styles.searchSection}>
          <Search color="#94A3B8" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by student name..."
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <FlatList data={filteredStudents} renderItem={({ item }) => <StudentCard item={item} />} keyExtractor={it => it.id} contentContainerStyle={{paddingBottom: 80}} />
        <TouchableOpacity style={styles.fab} onPress={handleAddAbsence}><Plus color="black" size={32} /></TouchableOpacity>
      </View>
      <View style={styles.bottomNav}>
        <NavButton icon={<Map size={24} />} label="Route" color="#3B82F6" onPress={() => navigation.navigate?.('Route')} />
        <NavButton icon={<Users size={24} />} label="Students" color="#3B82F6" active onPress={() => navigation.navigate?.('Students')} />
        <NavButton icon={<Bell size={24} />} label="Alerts" color="#3B82F6" onPress={() => navigation.navigate?.('Alerts')} />
        <NavButton icon={<UserCircle size={24} />} label="Profile" color="#3B82F6" onPress={() => navigation.navigate?.('Profile')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  backButton: {
    padding: 5,
  },

  blueContent: {
    flex: 1,
    backgroundColor: '#8ECAE6',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
  },

  searchSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 20,
    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },

  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  idLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  statusSection: {
    alignItems: 'flex-end',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: '#FEF08A',
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  bottomNav: {
    flexDirection: 'row',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
  },

  activeNavItem: {
    backgroundColor: '#DBEAFE',
    padding: 8,
    borderRadius: 10,
  },

  navText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: 'bold',
  },
});
