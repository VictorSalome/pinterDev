import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

interface UploadImageParams {
    file: File;
    title: string;
    description?: string;
    collectionId?: string;
}

export const uploadImage = async ({ file, title, description, collectionId }: UploadImageParams) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    // Upload imagem para o storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.data.user.id}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Criar registro no banco
    const { error: dbError } = await supabase
        .from('user_images')
        .insert({
            user_id: user.data.user.id,
            title,
            description,
            image_url: data.path,
            collection_id: collectionId
        });

    if (dbError) throw dbError;
};

export const getUserImages = async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
        .from('user_images')
        .select('*')
        .eq('user_id', user.data.user.id)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}; 