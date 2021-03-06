import { getContactsReq } from "./chat.api"

function wrapPromise(promise) {
	let status = "loading"
	let result
	let suspender = promise.then(
		(data) => {
			status = "success"
			result = data
		},
		(error) => {
			status = "error"
			result = error
		}
	)

	return {
		read() {
			if (status === "loading") {
				throw suspender
			} else if (status === "error") {
				throw result
			} else if (status === "success") {
				return result
			}
		},
	}
}

export default function createResource() {
	return {
		contacts: wrapPromise(getContactsReq()),
		// add here
	}
}