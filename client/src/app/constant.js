export const ListingStatus = {
    ALL: 'all',
    UNVERIFIED: 'unverified',
    ACTIVE: 'active',
    STOP_PUBLIC: 'stop_public',
    BLOCK_ACTIVITY: 'block_activity'
}

export const ReservationFilter = {
    ALL: 'all',
    REQUEST: 'request',
    UPCOMING: 'upcoming',
    CHECKIN: 'checkin',
}

export const UserListingFilter = {
    TYPE: 'type',
    STAR: 'star',
}

export const ReservationStatus = {
    REQUEST: { id: 1, name: 'request', color: '#f6cf48' },
    ACCEPTED: { id: 2, name: 'accepted', color: '#7cccb2' },
    PAID: { id: 3, name: 'paid', color: '#6ab5f8' },
    CANCELLED: { id: 4, name: 'cancelled', color: '#5b5b68' },
    CHECKIN: { id: 5, name: 'checkin', color: '#f6cf48' },
    CHECKOUT: { id: 6, name: 'checkout', color: '#b53e4e' },
    DECLINE: { id: 7, name: 'decline', color: '#50596e' },
    REVIEWED: { id: 8, name: 'reviewed', color: '#50596e' },
}

export const AdminTab = {
    DASHBOARD: 'dashboard',
    PAYOUT: 'payout',
    LISTINGS: 'listings',
    BOOKINGS: 'bookings',
    USERS: 'users',
    HOSTS: 'hosts',
}

export const UserProfileTab = {
    USER_PROFILE: 'user_profile',
    CHANGE_PASSWORD: 'change_password',
    FAVORITE: 'favorite',
    BOOKINGS: 'bookings',
    MESSAGE: 'message',
}

export const HostTab = {
    INBOX: 'inbox',
    LISTINGS: 'listings',
    RESERVATIONS: 'reservations',
    ADD_LISTING: 'add_listing',
}

export const listing_types = [
    { id: 1, name: 'Homestay', value: 'type-1', badge: 'badge badge-primary' },
    { id: 2, name: 'Nhà riêng', value: 'type-2', badge: 'badge badge-secondary' },
    { id: 3, name: 'Biệt thự', value: 'type-3', badge: 'badge badge-success' },
    { id: 4, name: 'Chung cư', value: 'type-4', badge: 'badge badge-danger' },
    { id: 5, name: 'Studio', value: 'type-5', badge: 'badge badge-warning' },
    { id: 6, name: 'Căn hộ dịch vụ', value: 'type-6', badge: 'badge badge-info' },
    { id: 7, name: 'Nhà tập thể/ Cư xá', value: 'type-7', badge: 'badge badge-dark' },
];

export const ROLE = {
    USER: { id: 3, name: 'User' },
    HOST: { id: 2, name: 'Host' },
    ADMIN: { id: 1, name: 'Admin' },
};