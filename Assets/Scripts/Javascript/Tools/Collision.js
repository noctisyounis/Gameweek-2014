function BoxCollider(box1, box2)
{
   if((box2.x >= box1.x + box1.w)
    || (box2.x + box2.w <= box1.x)
    || (box2.y >= box1.y + box1.h)
    || (box2.y + box2.h <= box1.y))
          return false; 
   else
          return true; 
}

function PointCollider(curseur_x, curseur_y, box)
{
   if (curseur_x >= box.x 
    && curseur_x < box.x + box.w
    && curseur_y >= box.y 
    && curseur_y < box.y + box.h)
       return true;
   else
       return false;
}