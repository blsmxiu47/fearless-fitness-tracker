export const fetchEndpoint = async (ep: string, user = true, community = true) => {
    try {
        const res = await fetch(
            '/api/' + ep,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        if (!res.ok) throw new Error(res.statusText)
        return await res.json()
    } catch (error) {
        console.error('fetch error:', error)
        throw error;
    }
}
