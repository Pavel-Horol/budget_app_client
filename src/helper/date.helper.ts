export const formatDate = (dateString: string):string => {

	const data = new Date(dateString);
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	//@ts-expect-error something with options
	return data.toLocaleDateString('en-US', options)
}