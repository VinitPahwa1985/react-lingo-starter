import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div style={{ padding: 20 }}>
      <h1>{t('welcome.title')}</h1>

      <button>{t('cta.get_started')}</button>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        <button onClick={() => i18n.changeLanguage('hi')}>HI</button>
        <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
      </div>
    </div>
  );
}

export default App;