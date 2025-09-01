import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface ProfileMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  action?: () => void;
}

export default function ProfileScreen({
  navigation,
}: {
  navigation: any;
}) {

  const profileMenuItems: ProfileMenuItem[] = [
    {
      id: '1',
      title: 'Address',
      subtitle: 'Manage your saved address',
      icon: 'location-outline',
    },
    {
      id: '2',
      title: 'Order History',
      subtitle: 'View your past orders',
      icon: 'bag-outline',
    },
    {
      id: '3',
      title: 'Language',
      subtitle: '',
      icon: 'globe-outline',
    },
    {
      id: '4',
      title: 'Notifications',
      subtitle: '',
      icon: 'notifications-outline',
    },
  ];

  const supportMenuItems: ProfileMenuItem[] = [
    {
      id: '5',
      title: 'Contact Us',
      subtitle: '',
      icon: 'headset-outline',
    },
    {
      id: '6',
      title: 'Get Help',
      subtitle: '',
      icon: 'help-circle-outline',
    },
    {
      id: '7',
      title: 'Privacy Policy',
      subtitle: '',
      icon: 'shield-outline',
    },
    {
      id: '8',
      title: 'Terms and Conditions',
      subtitle: '',
      icon: 'document-text-outline',
    },
  ];

  const renderMenuItem = (item: ProfileMenuItem) => (
    <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.7}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon as any} size={20} color="#666" />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          {item.subtitle ? (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          ) : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCEDEA" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Image
            source={require('../../assets/images/user.png')}
            style={styles.userAvatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Olivia</Text>
            <Text style={styles.userEmail}>Oliva@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Profile Menu Items */}
        <View style={styles.menuSection}>
          {profileMenuItems.map(renderMenuItem)}
        </View>

        {/* Support Menu Items */}
        <View style={styles.menuSection}>
          {supportMenuItems.map(renderMenuItem)}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="log-out-outline" size={20} color="#B84953" />
            </View>
            <Text style={[styles.menuItemTitle, styles.logoutText]}>Log Out</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEDEA',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FCEDEA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  moreButton: {
    padding: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 5,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutText: {
    color: '#B84953',
  },
  bottomSpacing: {
    height: 30,
  },
});