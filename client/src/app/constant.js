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