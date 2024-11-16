import { supabase } from './supabase'

export async function createPin(
  userId: string,
  title: string,
  imageUrl: string,
  description?: string
) {
  const { data, error } = await supabase
    .from('pins')
    .insert({
      user_id: userId,
      title,
      image_url: imageUrl,
      description
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getPins() {
  const { data, error } = await supabase
    .from('pins')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getUserPins(userId: string) {
  const { data, error } = await supabase
    .from('pins')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
} 