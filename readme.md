This macro does multiple things

- Makes the tab bar vertical on the right side of the IDE
- Sorts tabs by name
- Groups the tabs by type (add margin beween and color codes each group)
- Renames tabs that have the same name to include part of the path for the given file (see readme.txt's in screenshot)

The color coding still needs some work and currently it only updates when you open files, not close them.

I personally also added the following userChrome tweak, to give the tabs some more space:

```css
.tabstrip-box
{
        width: 200px !important;
}
.tabstrip-box .tab-image-middle
{
        width: 250px !important;
}
```

Screenshot:

[![Vetical Sorted Tabs](http://thumbs.cl.ly/2z1f012a3t0T311y3n3R)](http://cl.ly/2z1f012a3t0T311y3n3R)