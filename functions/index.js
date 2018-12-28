const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const { Storage } = require("@google-cloud/storage");
const admin = require("firebase-admin");

const gcconfig = {
	projectId: "udemy-react-9ce28",
	keyFilename: "udemy-react.json"
};

const gcs = new Storage(gcconfig);
admin.initializeApp({
	credential: admin.credential.cert(require("./udemy-react.json"))
});

//extract image from, store image, return response when done.
exports.storeImage = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		if (
			!request.headers.authorization ||
			!request.headers.authorization.startWith("Bearer ")
		) {
			console.log("No token present!");
			response.status(403).json({ error: "Unauthorized" });
			return;
		}

		let idToken;
		idToken = request.headers.authorization.split("Bearer")[1]; //part after "Bearer " in auth

		//validating token
		admin
			.auth()
			.verifyIdToken(idToken)
			.then(decodedToken => {
				const body = JSON.parse(request.body);
				fs.writeFileSync(
					"/tmp/uploaded-image.jpg",
					body.image,
					"base64",
					err => {
						console.log(err);
						return response.status(500).json({ error: err });
					}
				);
				const bucket = gcs.bucket("udemy-react-9ce28.appspot.com");
				const uuid = UUID();
				bucket.upload(
					"/tmp/uploaded-image.jpg",
					{
						uploadType: "media",
						destination: "/places/" + uuid + ".jpg",
						metadata: {
							metadata: {
								contentType: "image/jpeg",
								firebaseStorageDownloadTokens: uuid
							}
						}
					},
					(err, file) => {
						if (!err) {
							response.status(201).json({
								imageUrl:
									"https://firebasestorage.googleapis.com/v0/b/" +
									bucket.name +
									"/o/" +
									encodeURIComponent(file.name) +
									"?alt=media&token=" +
									uuid
							});
						} else {
							console.log(err);
							response.status(500).json({ error: err });
						}
					}
				);
				return;
			})
			.catch(error => {
				console.log("Token is invalid");
				response.status(403).json({ error: "Unauthorized" });
			});
	});
});
