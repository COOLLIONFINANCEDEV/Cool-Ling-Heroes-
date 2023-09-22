export const InvestmentData = [
  {
    id: 1,
    amount: 1000,
    term: 12,
    gain: 10,
    status: 'completed',
    accepted: true,
    accepted_at: new Date(),
    date_of_refund: new Date(),
    refunded: false,
    refunded_at: new Date(),
    proof: 'proof1',
    created_at: new Date(),
    updated_at: null,
    donor: 123,
    User: {
      id: 456,
      email: 'user1@example.com',
      phone_number: '1234567890',
      full_name: 'User 1',
      role: 'user',
      password: 'password1',
      deleted: false,
      email_verified: true,
      phone_number_verified: true,
      account_activated: true,
      created_at: new Date(),
      updated_at: null,
    },
    ChangeRequest: [
      {
        id: 789,
        amount: 500,
        treated: false,
        amount_to_refund: 250,
        refund_proof: null,
        created_at: new Date(),
        updated_at: null,
        investmentId: 1,
        donor: 123,
      },
      {
        id: 890,
        amount: 300,
        treated: true,
        amount_to_refund: 150,
        refund_proof: 'proof2',
        created_at: new Date(),
        updated_at: null,
        investmentId: 1,
        donor: 123,
      },
    ],
  },
  {
    id: 2,
    amount: 2000,
    term: 24,
    gain: 20,
    status: 'pending',
    accepted: false,
    accepted_at: null,
    date_of_refund: new Date(),
    refunded: false,
    refunded_at: new Date(),
    proof: 'proof3',
    created_at: new Date(),
    updated_at: null,
    donor: 456,
    User: {
      id: 789,
      email: 'user2@example.com',
      phone_number: '9876543210',
      full_name: null,
      role: 'user',
      password: 'password2',
      deleted: false,
      email_verified: true,
      phone_number_verified: true,
      account_activated: true,
      created_at: new Date(),
      updated_at: null,
    },
    ChangeRequest: [],
  },
];

export const usersData = [
  {
    id: 1,
    email: 'user1@example.com',
    phone_number: '+22512345678',
    full_name: 'John Doe',
    role: 'donor',
    deleted: false,
    email_verified: true,
    phone_number_verified: true,
    account_activated: true,
    created_at: new Date(),
    updated_at: null,
  },
  {
    id: 2,
    email: 'user2@example.com',
    phone_number: '+22598765432',
    full_name: 'Jane Smith',
    role: 'donor',
    deleted: false,
    email_verified: true,
    phone_number_verified: true,
    account_activated: true,
    created_at: new Date(),
    updated_at: null,
  },
  {
    id: 3,
    email: 'user3@example.com',
    phone_number: '+22555555555',
    full_name: null,
    role: 'moderator',
    deleted: true,
    email_verified: false,
    phone_number_verified: true,
    account_activated: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    email: 'user4@example.com',
    phone_number: '+22544444444',
    full_name: 'Mike Johnson',
    role: 'customer advisor',
    deleted: false,
    email_verified: true,
    phone_number_verified: false,
    account_activated: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const AnnoucementDATA = [
  {
    id: 1,
    title: 'llll',
    status: true,
    created_at: new Date().setDate(20),
    updated_at: new Date().setDate(19),
    image: '/public/',
  },
  {
    id: 2,
    title: 'ldddddd',
    status: false,
    created_at: new Date().setMonth(5),
    updated_at: new Date().setMonth(8),
    image: '/public/',
  },
];

export const GivenFoodsSeed = [
  {
    KPIs: {
      quantityOfProductGiven: 300,
      environmentalImpact: 144,
      numberOfBeneficiaries: 40,
      donatorLevel: 'Gold',
      numberOfWish: 7,
      wishGranted: 7,
      quantityOfProductDelivered: 300,
      stock: 150,
    },
    foods: {
      pagination: {
        current_page: 1,
        total_pages: 5,
        items_per_page: 5,
      },
      data: [
        {
          id: 1,
          name: 'Sample Food 1',
          donator_id: 102,
          quantity: 10,
          delivery_date: '2023/08/26',
          expiry_date: '2023/08/26',
          received_date: '2023/09/26',
          donor: {
            name: 'Donator 1',
          },
        },
        {
          id: 2,
          name: 'Sample Food 2',
          donator_id: 102,
          quantity: 8,
          delivery_date: '2023/08/26',
          expiry_date: '2024/02/26',
          received_date: '2023/09/26',
          donor: {
            name: 'Donator 1',
          },
        },
        {
          id: 3,
          name: 'Sample Food 3',
          donator_id: 102,
          quantity: 15,
          delivery_date: '2023/08/26',
          expiry_date: '2023/08/26',
          received_date: '2023/09/26',
          donor: {
            name: 'Donator 1',
          },
        },
        {
          id: 4,
          name: 'Sample Food 4',
          donator_id: 102,
          quantity: 12,
          delivery_date: '2023/08/26',
          expiry_date: '2023/08/26',
          received_date: '2023/09/26',
          donor: {
            name: 'Donator 1',
          },
        },
        {
          id: 5,
          name: 'Sample Food 5',
          donator_id: 102,
          quantity: 7,
          delivery_date: '2023/08/26',
          expiry_date: '2023/08/26',
          received_date: '2023/09/26',
          donor: {
            name: 'Donator 1',
          },
        },
      ],
    },
  },
];
