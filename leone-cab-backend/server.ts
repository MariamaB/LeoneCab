import app from './app';
import helmet from 'helmet';

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
