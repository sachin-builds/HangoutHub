const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// API to get filtered cafes
app.get('/api/cafes', async (req, res) => {
  const { vibe, price } = req.query;
  
  let query = supabase.from('cafes').select('*');

  if (vibe) query = query.contains('vibe_tags', [vibe]); [cite: 36]
  if (price) query = query.eq('price_range', price); [cite: 33]

  const { data, error } = await query;
  if (error) return res.status(400).json(error);
  res.json(data);
});