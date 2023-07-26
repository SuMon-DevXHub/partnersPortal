export interface ProfileInfo {
  id: number | null
  firstName: string | null
  lastName: string | null
  email: string | null
  dateJoined: string | null
  gender: string | null
  phone: string | null
  address: string | null
  businessName: string | null
  businessType: string | null
  avatar: string | null
  paymentStatus: string | null
  closeAccountInfo: string | null
  isOwner: boolean | null
  userPermission: string | null
  alertPermission: string | null
}

export interface TokenInfo {
  token: string | null
  refresh: string | null
  user: ProfileInfo | null
  loggedIn: boolean | null
}