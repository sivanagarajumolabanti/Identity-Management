const router = require('express').Router();
const crypto = require('crypto');
let Credentials = require('../models/credential.model');

var Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


const Credential_abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "useremail",
				"type": "string"
			},
			{
				"name": "hash",
				"type": "string"
			}
		],
		"name": "credential_hash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userid",
				"type": "string"
			}
		],
		"name": "getCredentials_hash",
		"outputs": [
			{
				"name": "hash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


const Credential_owner = "0x8abDb865B64933aeAbc269dd8b8AAd6DdD8DADf0"; //copy and paste the entity
const Credential_contract_address = "0xeecf0ee2f2a06a716d89fbf04f89093237611ebb"; // req.body.comtractAddress

const credential_abi = Credential_abi;
const credential_Instance = new web3.eth.Contract(credential_abi, Credential_contract_address);

router.route('/list').get((req, res) => {
	// Credentials.find()
	// 	.then(credentials => res.json({ "User credentials": credentials }))
	// 	.catch(err => res.status(400).json('Error: ' + err));
	Credentials.find({}, function (err, Credentials) {
		if (!Credentials || !Credentials.length) {
			console.log('No records Found')
			res.status(200).json('No records Found');
			return
		}
		else {
			res.status(200).json({ "List of Credentials": Credentials });
		}
	});
});



router.route('/create').post((req, res) => {
	try {
		const Company = req.body.company;
		const Recipient = req.body.recipient;
		const Credential_Name = req.body.credentialname;
		const Credential_Fields = req.body.credentialfields;

		const hash = crypto.createHash('sha256').update(JSON.stringify(req.body.credentialfields)).digest('hex');
		const Credential_Hash = hash;


		const newCredential = new Credentials({
			Company,
			Recipient,
			Credential_Name,
			Credential_Fields,
			Credential_Hash
		});

		const st = async function () {

			return await credential_Instance.methods.credential_hash(Recipient, Credential_Hash).send({ from: Credential_owner, gas: 3000000 }).on('transactionHash', function (txhash) {
				console.log('Txhash:', txhash);
			}).on('receipt', function (receipt) {
				// Process when transaction is confirmed
				console.log('receipt:', receipt);
			}).on('error', function (error) {
				// Process when transaction is failed
				console.error(error);
			});
		}
		st(Credential_owner).then(() => {
		});
		newCredential.save()
			.then(() => res.json('Credentials created for the user and credential hash stored in the blockchain'))
			.catch(err => res.status(400).json('Error: ' + err));
	} catch (error) {
		res.status(404).json({ error: "Route Doesn't exist (or) should give body arguments in correct way " });
	}

});

router.route('/get/:id').get((req, res) => {
	try {
		var credential_id = req.params.id;

		Credentials.findById(credential_id)
			.then(credentials => res.json(credentials))
			.catch(err => res.status(400).json('Error: ' + err));
	} catch (error) {
		res.status(404).json({ error: "id not matched (or) should give body arguments in correct way " });
	}
});

router.route('/delete/:id').delete((req, res) => {
	try {
		var credential_id = req.params.id;

		Credentials.findByIdAndDelete(credential_id)
			.then(() => res.json('Credentials deleted.'))
			.catch(err => res.status(400).json('Error: ' + err));
	} catch (error) {
		res.status(404).json({ error: "id not matched (or) should give body arguments in correct way " });
	}
});

router.route('/update/:id').post((req, res) => {
	try {
		var credential_id = req.params.id;

		Credentials.findById(credential_id)
			.then(credentials => {
				credentials.Company = req.body.company;
				credentials.Recipient = req.body.recipient;
				credentials.Credential_Name = (req.body.credentialname);
				credentials.Credential_Fields = (req.body.credentialfields);

				credentials.save()
					.then(() => res.json('Credentials updated!'))
					.catch(err => res.status(400).json('Error: ' + err));
			})
			.catch(err => res.status(400).json('Error: ' + err));
	} catch (error) {
		res.status(404).json({ error: "id not matched (or) should give body arguments in correct way " });
	}
});


router.route('/hash').get((req, res) => {
	try {
		const useremailid = req.body.useremail_id;

		const hash = async function () {
			const value = await credential_Instance.methods.getCredentials_hash(useremailid).call();
			res.status(200).json({ "User Credential hash": value });
		}
		hash().then(() => {
		});
	} catch (error) {
		res.status(404).json({ error: "Route does not exist  (or) should give body arguments in correct way" })
	}
});

router.route('/credentialsbyUser').get((req, res) => {
	try {
		const hash = req.body.hash;
		// const cre_id = req.body.credential_id;
		const user_email_id = req.body.emailid
		// console.log(JSON.stringify(user_email_id));
		// Credentials.findById(cre_id, function (err, credentials) {
		// 	if (err) throw err;
		// 	console.log(credentials.Credential_Hash);
		// 	if (hash === credentials.Credential_Hash) {
		// 		res.status(200).json({ "User Credential Fields ": credentials.Credential_Fields })
		// 	} else {
		// 		res.status(404).json({ error: "user hash not matched " })
		// 	}

		// });
		var reci = { Recipient: user_email_id }
		Credentials.find(reci,{}, function (err, credentials) {
			if (err) throw err;
			console.log(credentials[0].Credential_Hash);
			// console.log(credentials.Credential_Hash);
			// console.log(hash);
			if (hash === credentials[0].Credential_Hash) {
				res.status(200).json({ "User Credential Fields ": credentials[0].Credential_Fields })
			} else {
				res.status(404).json({ error: "user hash not matched " })
			}
			

		});
	} catch (e) {
		res.status(404).json({ error: "Route does not exist (or) should give body arguments in correct way" })
	}
});


module.exports = router;