import { supabase } from './supabase'
import { Database } from '@/app/Interfaces/interfaces'

export async function createCollection(
  userId: string,
  title: string,
  description?: string,
  isPrivate: boolean = false
) {
  const { data, error } = await supabase
    .from('collections')
    .insert({
      user_id: userId,
      title,
      description,
      is_private: isPrivate
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserCollections(userId: string) {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function addPinToCollection(collectionId: string, pinId: string) {
  const { error } = await supabase
    .from('collection_pins')
    .insert({
      collection_id: collectionId,
      pin_id: pinId
    })

  if (error) throw error
} 