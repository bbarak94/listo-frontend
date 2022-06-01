// FETCH
const uploadImg = async (ev) => {
    // Defining our variables
    const UPLOAD_PRESET = 'u3ntzyvb' // Insert yours
    // const UPLOAD_PRESET = 'k0bpqgsj' // Insert yours
    const CLOUD_NAME = 'bbarak94' // Insert yours
    // const CLOUD_NAME = 'dscodingds' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    // Sending a post method request to Cloudniarys' API
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })
        
        // const elImg = document.createElement('img');
        const { url } = await res.json()
        
        // elImg.src = url;
        // document.body.append(elImg);
        return url

    } catch (err) {
        console.error('ERROR!', err)
    }
}

export const cloudinaryService = {
    uploadImg
}
