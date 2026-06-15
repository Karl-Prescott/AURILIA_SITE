# AURILIA - site temporaire

Site statique public et temporaire pour AURILIA, prêt pour GitHub Pages.

## Déploiement GitHub Pages

Le site est publié avec GitHub Pages.

- Branche publiée : `main`
- Dossier publié : `/root`
- Domaine personnalisé : `aurilia.ca`
- Fichier de domaine : `CNAME`
- DNS : gérés chez WHC

Ce dépôt sert seulement au site public statique. Il ne contient pas l'application AURILIA complète.

## État actuel

- Site statique publié sur GitHub Pages.
- Domaine `aurilia.ca` configuré.
- DNS configurés chez WHC pour pointer vers GitHub Pages.
- Propagation DNS et HTTPS en attente ou à surveiller.
- Ne plus modifier les DNS pour l'instant.
- Projet AURILIA_SITE en pause temporaire pendant l'attente DNS/HTTPS.
- Prochaine étape possible : reprendre Recetto dans le projet principal `Z:\AURILIA`.

## DNS chez WHC pour aurilia.ca

Le domaine racine `aurilia.ca` pointe vers les IP GitHub Pages :

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

Le sous-domaine `www.aurilia.ca` pointe vers GitHub Pages :

```text
CNAME www   karl-prescott.github.io
```

## Note DNS et HTTPS

Après une modification DNS ou GitHub Pages, la propagation peut prendre du temps. Le HTTPS peut aussi prendre un certain délai avant d'être pleinement actif.
