# Payment Service

This service handles payments by receiving data from an XPayments webhook. It processes successful and failed payments, updates user balances, and stores payment information in a MongoDB database.

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/just2102/xpayments-webhook-handler.git
cd payment-service
```

### Install Dependencies

```sh
yarn install
```

### Set Up Environment Variables

Create a `.env` file in the root of the project and add the following variable:

```env
MONGO_URI=mongodb://localhost:27017/xpayments
```

### Run MongoDB

Make sure MongoDB is running on your local machine. If you don't have MongoDB installed, you can download and install it from the [official website](https://www.mongodb.com/try/download/community).

To start MongoDB:

```sh
mongod
```

You can also use [MongoDB Compass](https://www.mongodb.com/docs/compass/current/install/) to view and manage your database

### Run the Application

Using yarn:

```sh
yarn start
```

The server should now be running on `http://localhost:3000`.

## API Endpoints

### POST /payments

Receives payment data from the XPayments webhook and processes the payment.

#### Request Body

```json
{
  "id": "string",
  "date": "string",
  "status": "string",
  "metadata": {
    "user_id": "string"
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
